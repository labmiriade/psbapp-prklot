
set -eux

cp -r import_prklot/* /asset-output
pip install -r requirements.txt --target /asset-output
