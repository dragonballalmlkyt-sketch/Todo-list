export default function Notification({ message, Colour }) {

    const notificationStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor: Colour,
        zIndex: 1000,
    };
    if ( message !== "") {
        setTimeout(() => {
            message = "";
        }, 3000);
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
}