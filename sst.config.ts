/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'gym-franchise-prototype',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    const site = new sst.aws.StaticSite('GymPrototypeSite', {
      build: {
        command: 'npm run build',
        output: 'dist',
      },
      errorPage: 'index.html', // SPA routing - all errors redirect to index.html
      environment: {
        // Build-time environment variables can be added here if needed
      },
    })

    return {
      url: site.url,
    }
  },
})
