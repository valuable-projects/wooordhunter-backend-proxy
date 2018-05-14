const { exec } = require('child_process');

(async () => {
  await new Promise((resolve, reject) => {
    exec('now rm wooordhunter-backend-proxy --yes');

    exec('now --public', (error, stdout, strerr) => {
      if (error) return reject(error);

      // here we have url to created instance
      const url = stdout;

      console.log('stdout', stdout);

      exec(`now alias ${url} wooordhunter-backend-proxy`);

      exec('now scale wooordhunter-backend-proxy.now.sh 1');
    });
  });

  process.exit(0);
})();
