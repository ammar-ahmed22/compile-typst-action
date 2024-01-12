const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: 'YOUR_PERSONAL_ACCESS_TOKEN' });

async function addNewFile(owner, repo, path, content, message, branch) {
    const contentEncoded = Buffer.from(content).toString('base64');

    const { data: refData } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/heads/{branch}', {
        owner,
        repo,
        branch
    });
    const commitSha = refData.object.sha;

    const { data: commitData } = await octokit.request('GET /repos/{owner}/{repo}/git/commits/{commit_sha}', {
        owner,
        repo,
        commit_sha: commitSha
    });
    const treeSha = commitData.tree.sha;

    const { data: blobData } = await octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
        owner,
        repo,
        content: contentEncoded,
        encoding: 'base64'
    });
    const blobSha = blobData.sha;

    const { data: treeData } = await octokit.request('POST /repos/{owner}/{repo}/git/trees', {
        owner,
        repo,
        base_tree: treeSha,
        tree: [{
            path: path,
            mode: '100644',
            type: 'blob',
            sha: blobSha
        }]
    });
    const newTreeSha = treeData.sha;

    const { data: newCommitData } = await octokit.request('POST /repos/{owner}/{repo}/git/commits', {
        owner,
        repo,
        message,
        tree: newTreeSha,
        parents: [commitSha]
    });
    const newCommitSha = newCommitData.sha;

    await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/heads/{branch}', {
        owner,
        repo,
        branch,
        sha: newCommitSha
    });
}

// Usage
addNewFile('username', 'repo', 'newfile.txt', 'Hello, World!', 'Add new file', 'branch-name')
    .then(() => console.log('New file added'))
    .catch(error => console.error('Error adding file:', error));
