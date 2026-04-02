const fs = require('fs');

// Read your Playwright JSON
const data = JSON.parse(
  fs.readFileSync('test-results/results.json', 'utf-8')
);

// Execution Key
const testExecutionKey = process.env.XRAY_EXECUTION_KEY || 'CI-64';

const xray = {
  testExecutionKey,
  tests: []
};

// Extract Jira ID
function extractJira(test) {
  const jira = test.annotations?.find(a => a.type === 'jira');
  return jira ? jira.description : null;
}

// Map status
function mapStatus(result) {
  switch (result.status) {
    case 'passed': return 'PASS';
    case 'failed': return 'FAIL';
    case 'skipped': return 'TODO';
    default: return 'TODO';
  }
}

// Traverse structure
function processSuite(suite) {
  suite.specs?.forEach(spec => {
    spec.tests.forEach(test => {

      const testKey = extractJira(test);
      if (!testKey) return;

      // Get latest result
      const result = test.results[test.results.length - 1];

      xray.tests.push({
        testKey,
        status: mapStatus(result),
        comment: result.errors?.[0]?.message || 'Executed via Playwright'
      });
    });
  });

  suite.suites?.forEach(processSuite);
}

// Start processing
data.suites.forEach(processSuite);

// Write output
fs.writeFileSync(
  'test-results/xray-report.json',
  JSON.stringify(xray, null, 2)
);

console.log('✅ Xray report generated');