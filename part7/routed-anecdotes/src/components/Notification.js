const Notification = ({ notification }) => {
  if (notification === null) return null;

  const style = {
    padding: '5px',
    border: '1px solid red',
    fontSize: '30px'
  }

  return (
    notification &&
    <div className="container" style={style}>
      {notification}
    </div>
  );
};

export default Notification;