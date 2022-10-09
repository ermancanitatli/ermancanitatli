rimraf dist

tsc -p ./tsconfig.build.json --pretty

# cp -R src/public dist/src/public

cp package.json dist/
npx prisma db push
npx prisma generate
echo "Build complete"
echo "Run 'npm run start' to start the server"
echo "Run 'npm run build' to build the server"
echo "Run 'npm run test' to test the server"
