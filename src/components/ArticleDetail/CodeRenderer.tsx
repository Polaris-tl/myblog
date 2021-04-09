import React, { useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
// import less from "react-syntax-highlighter/dist/esm/languages/prism/less";

interface IProps {
  language: string;
  value: string;
}

const CodeRenderer: React.FC<IProps> = (props) => {
  useEffect(() => {
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
    SyntaxHighlighter.registerLanguage("typescript", typescript);
  }, []);
  const { language, value } = props;
  return (
    <figure className="highlight">
      {/* 
        SyntaxHighlighter 配置
        language - 高亮显示的代码语言，例如css、javascript、jsx等。其他选项可以查看hljs和prism
        style - styles/hljs或styles/prism目录中需要的样式对象。需要导入
        children - 需要突出显示的代码
        codeTagProps - 传到<code>标记中的道具，一般通过这个属性传递样式或者className
        useInlineStyles - 此prop作为false传入的时候，语法高亮将失效。然后可以使用highlight.js提供的css文件设置代码块的样式
        showLineNumbers - true/false，显示行号
        startingLineNumber - number，行编号开始数
        lineNumberContainerStyle - 行号容器默认显示在左侧，右侧填充10px。可以使用这个覆盖这些样式
        lineNumberStyle - 行号样式
        wrapLines - true/false，确定每行代码是否应该包装在父元素中。默认为false，如果为false，则无法对行级别元素执行操作
        lineProps - 如果wrapLines为true，则传递给包裹每一行的span的props。可以是一个对象或者一个方法,接受当前行号作为参数并返回props对象
        renderer - 用于渲染代码行的可选自定义渲染器
        PreTag - 要使用的元素或自定义反应组件来代替默认的pre标记，即组件的最外层标记
        CodeTag - 要使用的元素或自定义反应组件来代替默认代码标记，组件树的第二个标记
        spread props - 传递任意道具以预先标记包装代码 
        */}
      <SyntaxHighlighter language={language} style={darcula} showLineNumbers={true} wrapLines={true}>
        {value}
      </SyntaxHighlighter>
    </figure>
  );
};
export default CodeRenderer;
