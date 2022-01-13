# Company Office App

## Setup

**1. Run docker-compose**

The services can be run on the background with command:

```bash
docker-compose up -d
```

**2. Install Server Dependencies**

Open command-prompt in company-app directory, and run `npm install`

```bash
cd company-app
npm install
```

**3. Install Client Dependencies**

Open command-prompt in company-app/client directory, and run `npm install`

```bash
cd client
npm install
```

**4. Install Client Dependencies**

Open command-prompt in company-app, and run `npm run dev`

```bash
cd ..
npm run dev
```

## Server

The server side made of NodeJS, ExpreessJS, and MongoDB with available endpoints as listed below :

| Method | Endpoint                  | Request Body              |
| ------ | ------------------------- | ------------------------- |
| GET    | /api/company/             | Get All Company data      |
| GET    | /api/company/:id          | Get company data by ID    |
| Post   | /api/company/             | Create new company        |
| PUT    | /api/company/addoffice    | Create new office         |
| PUT    | /api/company/deleteoffice | Remove office data        |
| Delete | /api/company/:id          | Remove company data by ID |

## Client

The client side made of ReactJS with Redux, material-ui UI Library, react-router, Axios, and Formik+yup for form handling. The client side have capabilities to perform data manipulation such as :

1. View companies data
2. Create new company data
3. Remove company data
4. Create new office data
5. Remove office data
