export function uniformColumns(columns) {
  return columns.map((item) => {
    if (item.children) {
      item.children = uniformColumns(item.children)
    }
    return {
      ...item,
      align: 'center',
      render: item.render
        ? item.render
        : (text) => {
            if (typeof text === 'number') {
              return text
            } else if (text) {
              return text
            } else {
              return '-'
            }
          },
    }
  })
}
