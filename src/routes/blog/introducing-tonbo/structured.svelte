<script>
	import { CodeBlock } from 'svhighlight';

	import 'highlight.js/styles/atom-one-dark.css';

	let code = `
let lower = "Alice".into();
let upper = "Bob".into();
let mut scan = txn
    .scan((Bound::Included(&name), Bound::Excluded(&upper)))
    .await
     // just project first column, skip others when reading from db files
    .projection(vec![1])
    // only need one row
    .limit(1)
    .take()
    .await.unwrap();
`;
</script>

<CodeBlock
	language="rust"
	{code}
	showHeader={false}
	showLineNumbers={true}
	background="bg-background-dark"
	codeTextClasses="font-code text-background-light text-[0.8rem]"
	lineNumberTextClasses="font-code text-background-light"
	rounded="rounded-none"
/>
