import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

const FilterButton = ({ onFilterChange, userID }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:8081/filters");
        const filters = response.data;

        const initialItems = {};
        filters.forEach((filter) => {
          initialItems[filter.subject] = false;
        });

        setFilterOptions(filters);

        if (userID) {
          const userFiltersResponse = await axios.get(
            `http://localhost:8081/getUserFilters/${userID}`
          );
          const savedFilters = userFiltersResponse.data.filters;

          console.log("Saved filters from backend:", savedFilters);

          const updatedItems = { ...initialItems };
          savedFilters.forEach((filter) => {
            if (updatedItems.hasOwnProperty(filter)) {
              updatedItems[filter] = true;
            }
          });

          setSelectedItems(updatedItems);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    fetchFilters();
  }, [userID]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedItems = { ...selectedItems, [name]: checked };

    setSelectedItems(updatedItems);

    const selectedSubjectsText = [];
    filterOptions.forEach((filter) => {
      if (updatedItems[filter.subject]) {
        selectedSubjectsText.push(filter.subject);
      }
    });

    onFilterChange(selectedSubjectsText);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="border-0 d-flex align-items-center ps-0"
        variant=""
        id="dropdown-basic"
      >
        <h6 className="m-0 d-flex align-items-center gap-1">
          <i className="bx bx-filter-alt"></i> Filter
        </h6>
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="px-2"
        style={{ zIndex: "1000", width: "clamp(13rem, 10dvw, 18rem)" }}
      >
        {filterOptions.map((filter) => (
          <Form.Check
            key={filter.subject}
            type="checkbox"
            id={filter.subject}
            label={filter.subject}
            name={filter.subject}
            checked={selectedItems[filter.subject] || false}
            onChange={handleCheckboxChange}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterButton;
