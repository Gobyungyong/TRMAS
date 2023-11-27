function Button({ name, icon, onClick }) {
  return (
    <button
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
}

export default Button;
