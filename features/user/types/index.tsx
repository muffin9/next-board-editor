export interface UserType {
    id: string;
    email: string;
    phoneNumber: string;
    nickname: string;
    imgUrl: string;
}

// export interface UserProps {
//     app_metadata: {
//         provider: string;
//         providers: string[];
//     };
//     aud: string;
//     confirmation_sent_at: string;
//     confirmed_at: string;
//     created_at: string;
//     email: string;
//     email_confirmed_at: string;
//     id: string;
//     identities: {
//         created_at: string;
//         email: string;
//         id: string;
//         identity_data: {
//             email: string;
//             email_verified: boolean;
//             phone: string;
//             phone_verified: boolean;
//             sub: string;
//         }[];
//         identity_id: string;
//         last_sign_in_at: string;
//         provider: string;
//         updated_at: string;
//         user_id: string;
//     }[];
//     is_anonymous: boolean;
//     last_sign_in_at: string;
//     phone: string;
//     role: string;
//     updated_at: string;
//     user_metadata: {
//         email: string;
//         email_verified: boolean;
//         phone: string;
//         phone_verified: boolean;
//         sub: string;
//     };
// }
