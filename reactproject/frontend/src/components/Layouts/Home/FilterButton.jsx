import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed for fetching data

const FilterButton = ({ onFilterChange }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);

  // Fetch filter subjects from the backend on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:8081/filters"); // Fetch the filter subjects
        const filters = response.data;

        // Initialize the selectedItems state dynamically based on fetched filters
        const initialItems = {};
        filters.forEach((filter) => {
          initialItems[filter.subject] = false; // Initialize each filter as unchecked
        });

        setSelectedItems(initialItems);
        setFilterOptions(filters); // Store the fetched filter subjects
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    fetchFilters();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedItems = { ...selectedItems, [name]: checked };

    setSelectedItems(updatedItems);

    // Convert the selected items to a descriptive text format
    const selectedSubjectsText = [];
    filterOptions.forEach((filter) => {
      if (updatedItems[filter.subject])
        selectedSubjectsText.push(filter.subject);
    });

    // Send the descriptive text to the parent component
    onFilterChange(selectedSubjectsText);
  };

  const applyFilters = () => {
    const selectedFilters = [];
    filterOptions.forEach((filter) => {
      if (selectedItems[filter.subject]) selectedFilters.push(filter.subject);
    });

    console.log("Applied Filters:", JSON.stringify(selectedFilters, null, 2));

    // Send the selected filters back to the parent component
    onFilterChange(selectedFilters);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="border-0 d-flex align-items-center ps-0"
        variant=""
        id="dropdown-basic"
      >
        <h6 className="m-0">Filter</h6>
      </Dropdown.Toggle>

      <Dropdown.Menu className="px-2 z-1">
        {filterOptions.map((filter) => (
          <Form.Check
            key={filter.subject} // Use 'subject' for the key
            type="checkbox"
            id={filter.subject} // Use 'subject' for the id
            label={filter.subject} // Use 'subject' for the label
            name={filter.subject} // Use 'subject' for the name
            checked={selectedItems[filter.subject] || false}
            onChange={handleCheckboxChange}
          />
        ))}
        <button className="orangeButton w-100" onClick={applyFilters}>
          Apply Filters
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterButton;
