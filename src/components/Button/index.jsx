import Loader from "./../Loader";

const Button = ({ isLoading, isEdit }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button disabled={isLoading} type="submit">
            {isEdit ? "Update" : "Submit"}
          </button>
        </>
      )}
    </>
  );
};

export default Button;
