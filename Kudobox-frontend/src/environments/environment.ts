// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as Logger from 'js-logger';

export const environment = {
    logLevel: Logger.DEBUG,
    production: false,
    apiUrl: 'http://localhost:4001',
    azure: {
        tenantID: '0b53d2c1-bc55-4ab3-a161-927d289257f2',
        clientID: 'de411acd-f5d7-4040-8da6-3d3adce56901',
        redirectUri: 'http://localhost:4200/auth',
        endpoints: {},
        navigateToLoginRequestUri: false,
        cacheLocation: 'localStorage',
    },
    oidc: {
        authority: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0/',
        client_id: 'de411acd-f5d7-4040-8da6-3d3adce56901',
        redirect_uri: 'http://localhost:4200/auth',
        response_type: 'id_token token',
        scope: 'openid profile api://kudobox.euri.com/api',
        loadUserInfo: false,
        metadata: {
            authorization_endpoint:
                'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/oauth2/v2.0/authorize',
            token_endpoint: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/oauth2/v2.0/token',
            token_endpoint_auth_methods_supported: ['client_secret_post', 'private_key_jwt', 'client_secret_basic'],
            jwks_uri: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/discovery/v2.0/keys',
            response_modes_supported: ['query', 'fragment', 'form_post'],
            subject_types_supported: ['pairwise'],
            id_token_signing_alg_values_supported: ['RS256'],
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint:
                'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/oauth2/v2.0/logout',
            response_types_supported: ['code', 'id_token', 'code id_token', 'id_token token'],
            scopes_supported: ['openid', 'profile', 'email', 'offline_access'],
            issuer: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0',
            claims_supported: [
                'sub',
                'iss',
                'cloud_instance_name',
                'cloud_instance_host_name',
                'cloud_graph_host_name',
                'msgraph_host',
                'aud',
                'exp',
                'iat',
                'auth_time',
                'acr',
                'nonce',
                'preferred_username',
                'name',
                'tid',
                'ver',
                'at_hash',
                'c_hash',
                'email',
            ],
            request_uri_parameter_supported: false,
            userinfo_endpoint: 'https://graph.microsoft.com/oidc/userinfo',
            tenant_region_scope: 'EU',
            cloud_instance_name: 'microsoftonline.com',
            cloud_graph_host_name: 'graph.windows.net',
            msgraph_host: 'graph.microsoft.com',
            rbac_url: 'https://pas.windows.net',
        },
        post_logout_redirect_uri: 'http://localhost:4200/',
        signingKeys: [
            {
                kty: 'RSA',
                use: 'sig',
                kid: 'ie_qWCXhXxt1zIEsu4c7acQVGn4',
                x5t: 'ie_qWCXhXxt1zIEsu4c7acQVGn4',
                n:
                    '68tx2cnOfkvHf705c-ZIZfXiyxE6c9LqxVQDjIs-9DbvDEI7453kZi9tvQYzskJFdBlD8MYuVhX8Bpi_YUFF8eoJ1PFC2_82sDhF-mNJ7sPrYsgMJAL3rfzOKQapx3m9RPS-18KAZOg-SIDwbNcrDm5rYw5oXi2jbO4ctKzRKP3jznvHDeLnLCTcnDGkMCRBuENJugwh7oHjtGph1L3vNpI2lroB3HK2TcD1Mr5cYTcrd-j6bmk8LRewLCJjipZwmu3DiW4_kRnigw8O5BmYgMYkWZ7Gl048KBZL-7PyHTAXb7tMp9FdJfWY-Xu9KB9ayAW84GbCMJ7qoojwoCDb3Q',
                e: 'AQAB',
                x5c: [
                    'MIIDBTCCAe2gAwIBAgIQdRnV9VlJ0JZDXnbfp+XqZjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE5MDcxNTAwMDAwMFoXDTIxMDcxNTAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOvLcdnJzn5Lx3+9OXPmSGX14ssROnPS6sVUA4yLPvQ27wxCO+Od5GYvbb0GM7JCRXQZQ/DGLlYV/AaYv2FBRfHqCdTxQtv/NrA4RfpjSe7D62LIDCQC9638zikGqcd5vUT0vtfCgGToPkiA8GzXKw5ua2MOaF4to2zuHLSs0Sj94857xw3i5ywk3JwxpDAkQbhDSboMIe6B47RqYdS97zaSNpa6Adxytk3A9TK+XGE3K3fo+m5pPC0XsCwiY4qWcJrtw4luP5EZ4oMPDuQZmIDGJFmexpdOPCgWS/uz8h0wF2+7TKfRXSX1mPl7vSgfWsgFvOBmwjCe6qKI8KAg290CAwEAAaMhMB8wHQYDVR0OBBYEFCle84Tr3/8aZbTs2jryx2w21ANZMA0GCSqGSIb3DQEBCwUAA4IBAQAZsQq6JX4IFDXjfV9UnauPP2E5OUMQvqnNasAATucYctaeW307aQEhB4OQgFDKKUpcN4RHOLqxG4phqUhI72PzW8kNVjGvgSL+uXO7P0mYi0N+ujGXYi92ZzH9tODODQ2147ZDLDe0kiRB9KXwFLdJcY6dbkj0wVmIy4D5JtB9zTRj4R5ymWXCXz3ecN4DhjeZnjnZfxaqJJA6lbWLIcjenKjRXoW95WgtdSu2gpjaJCt4zITTw1cFL6sdHrcsT24j23EpNxUld8C/3IY8ac72HKMR5AloTRlXxwXM8XUwLcrUCVp0c61VNY6U2J0TXYdSvJHwSQ98wSbiSryT2SUk',
                ],
                issuer: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0',
            },
            {
                kty: 'RSA',
                use: 'sig',
                kid: 'aPctw_odvROoENg3VoOlIh2tiEs',
                x5t: 'aPctw_odvROoENg3VoOlIh2tiEs',
                n:
                    'p2DzxOZiWEHhtVavuwImryTRxW4kJ0mbA1lbXon550DUnKDZCNZaztno8HpOl6NSbVbW-QLDz5VOqCn-PDvSIRcw-2hrJPRnCNob4yGEuC7v9dPVpPDFRiUrOcwCbJak6xsK9PEsX8FQ_onFHO6YJkjsFG8S2nMhgRK-JdURUcuj9paywSBtW9ddeqjQPgCPbZJtk39ReouoBYNm9xiwhTN0InY9Rt9PKUh4cRetg3OeKQ2E8TOVh1nHeTT2HIIYnAgB7ESUA07wYBuvet4UGemC2SdfpTSWk2YqzjZONW8p01hJg9x8lcSeyaQVOxTP_SjQoP99la1V8lArF35qxQ',
                e: 'AQAB',
                x5c: [
                    'MIIDBTCCAe2gAwIBAgIQU10WcpDECatD1ywgv0TNJjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE5MDgyNTAwMDAwMFoXDTI0MDgyNDAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKdg88TmYlhB4bVWr7sCJq8k0cVuJCdJmwNZW16J+edA1Jyg2QjWWs7Z6PB6TpejUm1W1vkCw8+VTqgp/jw70iEXMPtoayT0ZwjaG+MhhLgu7/XT1aTwxUYlKznMAmyWpOsbCvTxLF/BUP6JxRzumCZI7BRvEtpzIYESviXVEVHLo/aWssEgbVvXXXqo0D4Aj22SbZN/UXqLqAWDZvcYsIUzdCJ2PUbfTylIeHEXrYNznikNhPEzlYdZx3k09hyCGJwIAexElANO8GAbr3reFBnpgtknX6U0lpNmKs42TjVvKdNYSYPcfJXEnsmkFTsUz/0o0KD/fZWtVfJQKxd+asUCAwEAAaMhMB8wHQYDVR0OBBYEFPBE/OYhU7DwWnEa6luL8L+MZwbHMA0GCSqGSIb3DQEBCwUAA4IBAQAYyA81g/dfsm/AeUyDfzObRaEdKinKI5GUFUvJXDobED7f6NL+ECyULBEVm/ksZBrg6f0aPTDnSFVsZIfMogXc0KfJrII1lnXucbt1LCOmjdlf54J1R/mn9dkHyZ3pfoZtpqcXlKFnRCurn864XqRQFgBSG39xUjXXUR5vWSrp3mHlil+W9Z9RTImNmkXnSJDosYLEvCUYyqarV8rKj6rBfaBdqP3F5s4GwIdjsZ13YfkD4c+meX3W/9x74awB5ys+p78c7IjnO8mQB9kPvY9wEnGLDfLQEC+A0af81ybvevMraFfwZtsq/FYJEMnn6hKkTUeb1kPpVdJLVN4JqiUM',
                ],
                issuer: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0',
            },
            {
                kty: 'RSA',
                use: 'sig',
                kid: 'M6pX7RHoraLsprfJeRCjSxuURhc',
                x5t: 'M6pX7RHoraLsprfJeRCjSxuURhc',
                n:
                    'xHScZMPo8FifoDcrgncWQ7mGJtiKhrsho0-uFPXg-OdnRKYudTD7-Bq1MDjcqWRf3IfDVjFJixQS61M7wm9wALDj--lLuJJ9jDUAWTA3xWvQLbiBM-gqU0sj4mc2lWm6nPfqlyYeWtQcSC0sYkLlayNgX4noKDaXivhVOp7bwGXq77MRzeL4-9qrRYKjuzHfZL7kNBCsqO185P0NI2Jtmw-EsqYsrCaHsfNRGRrTvUHUq3hWa859kK_5uNd7TeY2ZEwKVD8ezCmSfR59ZzyxTtuPpkCSHS9OtUvS3mqTYit73qcvprjl3R8hpjXLb8oftfpWr3hFRdpxrwuoQEO4QQ',
                e: 'AQAB',
                x5c: [
                    'MIIC8TCCAdmgAwIBAgIQfEWlTVc1uINEc9RBi6qHMjANBgkqhkiG9w0BAQsFADAjMSEwHwYDVQQDExhsb2dpbi5taWNyb3NvZnRvbmxpbmUudXMwHhcNMTgxMDE0MDAwMDAwWhcNMjAxMDE0MDAwMDAwWjAjMSEwHwYDVQQDExhsb2dpbi5taWNyb3NvZnRvbmxpbmUudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDEdJxkw+jwWJ+gNyuCdxZDuYYm2IqGuyGjT64U9eD452dEpi51MPv4GrUwONypZF/ch8NWMUmLFBLrUzvCb3AAsOP76Uu4kn2MNQBZMDfFa9AtuIEz6CpTSyPiZzaVabqc9+qXJh5a1BxILSxiQuVrI2BfiegoNpeK+FU6ntvAZervsxHN4vj72qtFgqO7Md9kvuQ0EKyo7Xzk/Q0jYm2bD4SypiysJoex81EZGtO9QdSreFZrzn2Qr/m413tN5jZkTApUPx7MKZJ9Hn1nPLFO24+mQJIdL061S9LeapNiK3vepy+muOXdHyGmNctvyh+1+laveEVF2nGvC6hAQ7hBAgMBAAGjITAfMB0GA1UdDgQWBBQ5TKadw06O0cvXrQbXW0Nb3M3h/DANBgkqhkiG9w0BAQsFAAOCAQEAI48JaFtwOFcYS/3pfS5+7cINrafXAKTL+/+he4q+RMx4TCu/L1dl9zS5W1BeJNO2GUznfI+b5KndrxdlB6qJIDf6TRHh6EqfA18oJP5NOiKhU4pgkF2UMUw4kjxaZ5fQrSoD9omjfHAFNjradnHA7GOAoF4iotvXDWDBWx9K4XNZHWvD11Td66zTg5IaEQDIZ+f8WS6nn/98nAVMDtR9zW7Te5h9kGJGfe6WiHVaGRPpBvqC4iypGHjbRwANwofZvmp5wP08hY1CsnKY5tfP+E2k/iAQgKKa6QoxXToYvP7rsSkglak8N5g/+FJGnq4wP6cOzgZpjdPMwaVt5432GA==',
                ],
                issuer: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0',
            },
        ],
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
