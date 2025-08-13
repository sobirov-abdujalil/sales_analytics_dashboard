import React from 'react';
import Select from '../../../components/ui/Select';

const CategoryFilter = ({ selectedCategories, onCategoryChange, categories }) => {
  const categoryOptions = categories?.map(category => ({
    value: category?.id,
    label: category?.name,
    description: `$${category?.revenue?.toLocaleString()} revenue`
  }));

  return (
    <div className="min-w-56">
      <Select
        label="Product Categories"
        options={categoryOptions}
        value={selectedCategories}
        onChange={onCategoryChange}
        multiple
        searchable
        clearable
        placeholder="All categories"
      />
    </div>
  );
};

export default CategoryFilter;