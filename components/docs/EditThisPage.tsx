import { useRouter } from 'next/router';

export function EditThisPage() {
  const router = useRouter();

  // Extract the file path from the current route
  const getFilePath = () => {
    const path = router.asPath.split('#')[0].split('?')[0];

    if (path === '/docs' || path === '/docs/') {
      return 'docs/index.mdx';
    }

    // Remove /docs prefix and add .mdx extension
    const cleanPath = path.replace(/^\/docs\/?/, '');
    return cleanPath ? `docs/${cleanPath}.mdx` : 'docs/index.mdx';
  };

  const filePath = getFilePath();
  const githubUrl = `https://github.com/yorkie-team/yorkie-team.github.io/blob/main/${filePath}`;

  return (
    <div className="edit_this_page">
      <blockquote>
        If you want to update this page or add new content, please submit a pull request to the{' '}
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          Homepage
        </a>
        .
      </blockquote>
    </div>
  );
}
