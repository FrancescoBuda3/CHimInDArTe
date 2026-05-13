#!/bin/bash
cd frontend
pnpm run build
scp -r dist/* chimindarte@chimindarte.disi.unibo.it:/var/www/html/
echo "Deployment completed successfully!"