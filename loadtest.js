import http from 'k6/http';

export const options = {
  vus: 5,
  duration: '100s',
};

export default function () {
  http.post(
    'http://localhost:8000/graphql',
    JSON.stringify({
      query:
        'query ExampleQuery {\n  users {\n    email\n    id\n    name\n  }\n}',
      variables: {},
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
