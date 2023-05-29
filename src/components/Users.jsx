const Users = ({ data }) => {
  return (
    <div>
      {data && (
        <ul className="flex flex-col gap-2 p-4">
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
