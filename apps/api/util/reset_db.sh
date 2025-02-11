if ! command -v "mongoimport" &> /dev/null; then
  printf "MongoDB tools must be installed.\nGet them here: https://www.mongodb.com/try/download/database-tools\n"
  exit 1
fi

printf "Grab the MongoDB password from 1password (Engineering Vault -> MongoDB Mobile Tech Challenge).\nYou will be prompted for it next.\n\n"

mongoimport --uri mongodb+srv://thepope@mobile-tech-challenge.occvoii.mongodb.net/countries --drop --jsonArray --collection countries --file ./util/db.json
