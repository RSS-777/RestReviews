const responseMessage = document.querySelector('.users-data__response-message');
const tableTBody = document.querySelector('.users-data__tbody');
const authenticationAdminPanel = document.getElementById('authentication__admin-panel');
const userRoleStatus = document.querySelector('.main-admin__status');

// Отримати доступ до адмін панелі і запустити рендер данних на сторінку
document.addEventListener('DOMContentLoaded', () => {
    accessAdminPanel()
    fetchUsers()
})

// Функція рендер даних всіх користувачів на сторінку (адмін-панель)
const fetchUsers = async () => {
    const arrRoles = ['user', 'moderator', 'admin'];

    try {
        const response = await fetch('/users')
        const result = await response.json()


        const currentUser = await getUserId()
        if (userRoleStatus) {
            userRoleStatus.textContent = (currentUser.roleId === 3) ? 'Access: Administrator' : 'Access: Moderator'
        }

        if (tableTBody && result) {
            tableTBody.innerHTML = '';

            result.data.forEach(user => {
                const defaultRoleIndex = arrRoles.indexOf(user.role_name) + 1
                const disabledAttribute = (user.authentication_id === currentUser.id) ? 'disabled' : '';

                tableTBody.innerHTML += `
                 <tr>
                   <td>${user.authentication_id}</td>
                   <td>${user.first_name}</td>
                   <td>${user.email}</td>
                   <td>${user.role_name}</td>
                   <td>
                      <select class="users-data__select" data-default-role="${defaultRoleIndex}" ${disabledAttribute}>
                         <option value ='1' class="users-data__option">user</option>
                         <option value ='2' class="users-data__option">moderator</option>
                         <option value ='3' class="users-data__option">admin</option>
                      </select
                   </td>
                 </tr>
                `;
            });
        }

        document.querySelectorAll('.users-data__select').forEach(selectElement => {
            const defaultValue = selectElement.getAttribute('data-default-role');
            if (defaultValue) {
                selectElement.value = defaultValue;
            }
        })

    } catch (error) {
        console.log('Помилка при отриманні даних:', error)
    }
}

//Функція для отримання дані користувача з сесії
const getUserId = async () => {
    const currentUserId = await fetch('/user')
    const response = await currentUserId.json()
    const data = await response
    return data
}

// Функція для доступу до адмін панелі
const accessAdminPanel = () => {
    fetch('/user')
        .then(response => {
            console.log('Статус відповіді:', response.status);

            if (!response.ok) {
                throw new Error('Мережевий запит не вдалося виконати');
            }
            return response.json();
        })
        .then(data => {
            if (data && (data.roleId === 3 || data.roleId === 2)) {
                authenticationAdminPanel.style.display = 'block';
                currentUserId = data.roleId
            } else {
                authenticationAdminPanel.style.display = 'none';
            }
        })
        .catch(error => console.log('Помилка отримання даних з сервера:', error));
};

//Обновити роль користувача
document.addEventListener('DOMContentLoaded', () => {
    if (tableTBody) {
        tableTBody.addEventListener('change', (event) => {
            const selectElement = event.target;
            const newRoleId = parseInt(selectElement.value, 10);
            const userId = parseInt(selectElement.closest('tr').querySelector('td').textContent, 10);

            fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    newRoleId: newRoleId
                })
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            console.log('Помилка:', errorData.error, errorData.message);
                            responseMessage.textContent = errorData.error;
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Отримані дані:', data.message);
                    responseMessage.textContent = data.message;

                    setTimeout(() => {
                        responseMessage.textContent = '';
                    }, 2000)

                    fetchUsers()
                    accessAdminPanel()
                })
                .catch(error => {
                    console.log('Помилка при оновленні ролі користувача:', error);
                });
        });
    }
});



