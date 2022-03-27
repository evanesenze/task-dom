/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.textContent = content;
        document.body.append(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/

const generateChildren = (childrenCount, className, children) =>
    new Array(childrenCount).fill(null).map(() => {
        const div = document.createElement('div');
        div.className = className;
        children.forEach((item) => div.append(item.cloneNode(true)));
        return div;
    });

export function generateTree(childrenCount, level) {
    const tree = document.createElement('div');
    tree.className = 'item_1';
    let children = [];
    for (let i = level; i > 1; i--)
        children = generateChildren(childrenCount, `item_${i}`, children);
    tree.append(...children);
    return tree;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);
    tree.querySelectorAll('.item_2').forEach((item) => {
        const section = document.createElement('section');
        section.className = 'item_2';
        section.innerHTML = item.innerHTML;
        item.parentNode.replaceChild(section, item);
    });
    return tree;
}
