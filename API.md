# API Renference

## Get partner list

- **URL**

  /cloudheroes/

- **Method**

    `GET`

- **URL Params**

    None

- **Data Params**

    None

- **Success Response:**
  - Code: 200
  - Content:
  {

        "_id": "5c0f25xxedcdd70083aebd9e",
        "name": "广州xx信息科技有限公司",
        "MPNid": 1234567,
        "benefitLevel": "S",
        "region": "S",
        "ptc": "abc@contoso.com",
        "pdm": "name",
        "__v": 0
    }

- **Error Response:**
  - Code: 500 + Error infomation

## Add New Partner

- **URL**

  /cloudheroes/

- **Method**

  `POST`

- **URL Params**

  None

- **Data Params**

    > {
        name: name,
        MPNid: MPNid,
        benefitLevel: benefitLevel,
        region: region,
        ptc: ptc,
        pdm: pdm,
    }

- **Success Response:**

- **Error Response:**

# Delete many partners
- **URL**
- **Method**
- **URL Params**

    None
- **Data Params**
    ```js
    {
        ids: number[] // Array of MPN id
    }
    ```
- **Success Response**

    HTTP 200
    ```js
    {
        msg: string // Message
    }
    ```
- **Error Response**

# Get partner list

- **URL**

- **Method**

- **URL Params**

- **Data Params**

- **Success Response:**

- **Error Response:**

# Get partner list

- **URL**

- **Method**

- **URL Params**

- **Data Params**

- **Success Response:**

- **Error Response:**

# Get partner list

- **URL**

- **Method**

- **URL Params**

- **Data Params**

- **Success Response:**

- **Error Response:**