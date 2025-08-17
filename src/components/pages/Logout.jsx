import axios from 'axios';

export default function Logout({ setUser }) {
    const handleLogout = async () => {
        try {
            // Отправка запроса на logout с refresh токеном
            await axios.post('https://django-admin-pro.onrender.com/api/accounts/logout/', {
                refresh: localStorage.getItem('refresh')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Очистка localStorage и сброс состояния пользователя
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <button onClick='/logout' style={{ padding: '8px 16px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}>
            Logout
        </button>
    );
}