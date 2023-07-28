const Country = ({ index, country, visitCountry, visited }) => {
  return (
    <div className="country">
      <p>
        {country.flag} {country.name.common}
      </p>
      {!visited && (
        <input
          type="checkbox"
          id="visited"
          onClick={() => visitCountry(index)}
        />
      )}
    </div>
  );
};
export default Country;
