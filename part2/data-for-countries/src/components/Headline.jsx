const Headline = ({ data, handleInputChange }) => {
  return (
    <div>
      find countries <input value={data} onChange={handleInputChange} />
    </div>
  );
};

export default Headline;
