function getCategoryTree(origin) {
    let res = []
    let stack = []
    for (let i = 0; i < origin.length; i++) {
        if (stack.length == 0) {
            const obj = {
                title: origin[i].title,
                level: origin[i].level,
                id: '123',
            }
            res.push(obj)
            stack.push(obj)
            continue;
        }
        //当前标签级别和上一个相同时
        if (origin[i].level == stack[stack.length - 1].level) {
            const obj = {
                title: origin[i].title,
                level: origin[i].level
            }
            stack[stack.length - 2].children = stack[stack.length - 2].children || []
            stack[stack.length - 2].children.push(obj)
            stack[stack.length - 1] = obj
            continue;
        }
        //当前标签级别比上一个大时，说明要在上一个标签中增加children属性
        if (origin[i].level > stack[stack.length - 1].level) {
            const obj = {
                title: origin[i].title,
                level: origin[i].level
            }
            stack[stack.length - 1].children = stack[stack.length - 1].children || []
            stack[stack.length - 1].children.push(obj)
            stack.push(obj)
            continue
        }
        if (origin[i].level < stack[stack.length - 1].level) {
            const obj = {
                title: origin[i].title,
                level: origin[i].level
            }
            while (stack.length != 0 && origin[i].level <= stack[stack.length - 1].level) {
                stack.pop()
            }
            if (stack.length != 0) {
                stack[stack.length - 1].children = stack[stack.length - 1].children || []
                stack[stack.length - 1].children.push(obj)
                stack.push(obj)
            } else {
                res.push(obj)
                stack.push(obj)
            }
            continue
        }
    }
    return res
}
export default getCategoryTree