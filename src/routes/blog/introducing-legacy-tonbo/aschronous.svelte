<script>
	import { CodeBlock } from 'svhighlight';

	import 'highlight.js/styles/atom-one-dark.css';

	let code = `
db.insert(User {
    name: "Alice".into(),
    email: Some("alice@gmail.com".into()),
    age: 22,
})
.await.unwrap();

let name = "Alice".into();
let user = txn
    .get(
        &name,
        Projection::All,
    )
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
