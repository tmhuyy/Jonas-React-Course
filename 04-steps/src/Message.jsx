const Message = function ({ steps, children }) {
  return (
    <p className="message">
      Step {steps + 1}: {children}
    </p>
  );
};

export default Message;
