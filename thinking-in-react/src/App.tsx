import { ChangeEventHandler, useState } from 'react';
import './App.css';
import { JSX } from 'react/jsx-runtime';

type Category = "Fruits" | "Vegetables";

type Product = {
  category: Category,
  price: string,
  stocked: boolean,
  name: string
};

const PRODUCTS: Product[] = [
  { category: "Fruits", price: "1€", stocked: true, name: "Pomme" },
  { category: "Fruits", price: "1€", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "2€", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "2€", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "4€", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "1€", stocked: true, name: "Peas" }
];

type FilterableProductTableProps = { products: Product[] };
function FilterableProductTable({ products }: FilterableProductTableProps) {

  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  function handleFilterTextChange(text: string) {
    setFilterText(text);
  }

  function handleInStockChange(inStock: boolean) {
    setInStockOnly(inStock);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

type SearchBarProps = {
  filterText: string,
  inStockOnly: boolean,
  onFilterTextChange: (text: string) => void,
  onInStockChange: (inStock: boolean) => void,
};
function SearchBar({ filterText, inStockOnly, onFilterTextChange,
  onInStockChange }: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

type ProductTableProps = { products: Product[], filterText: string, inStockOnly: boolean };
function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: Category | null = null;

  products.forEach((product) => {

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      && product.category.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
      return;

    if (inStockOnly && !product.stocked)
      return;

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }

    rows.push(
      <ProductRow product={product} key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type ProductCategoryRowProps = { category: Category };
function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr >
  );
}

type ProductRowProps = { product: Product };
function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}