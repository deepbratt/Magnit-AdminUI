const useNavigate = () => {
  const handleId = (id) => {
    console.log(`API_BASE/${id}`);
  };

  return { handleId };
};

export default useNavigate;
