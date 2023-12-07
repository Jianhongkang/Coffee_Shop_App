# Getting Started

## Bug 1 错误 1（多加一个【】，导致输出的数组变成了一个数

const [categories, setCategories] = useState([
getCategoriesFormData(CoffeeList),
] );

[["All", "Americano", "Black Coffee", "Cappucchino", "Espresso", "Latte", "Macchiato"]]

正确版本

const [categories, setCategories] = useState(
getCategoriesFormData(CoffeeList),
);
["All", "Americano", "Black Coffee", "Cappucchino", "Espresso", "Latte", "Macchiato"]
