import '../styles/componentStyles/NotificationTab.css';

function NotificationTab() {
  return (
    <div className="bg">
    <div className="notifications">
    <div className="back">
        <button>&gt;</button>
      </div>
        <p className="heading">Notifications</p>
    <div className="tabs">
        <div className="all"><button>All</button></div>
        <div className="announcements"><button>Announcements</button></div>
        <div className="reminders"><button>Reminders</button></div>
    </div>
    <div className="notification">
    <div className="notification-info">
        <p className="notification-name">Launch Night</p>
        <p className="notification-date">Monday 8th April 2024</p>
        <p className="notification-time">6:00pm - 8:00pm</p>
        <p className="notification-type">Club Event</p>
    </div>
    
    <div className="notibutton">
        <button>&gt;</button>
    </div>
    </div>
    </div>
    </div>
  );
}

export default NotificationTab;
