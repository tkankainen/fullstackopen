const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    color: message.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={style} className="message">
      {message.message}
    </div>
  );
};

export default Notification;
