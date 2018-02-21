export const API_URL = process.env.API_URL || 'http://localhost:8080/api/';

// Allowed temperature input limits in celsius degrees.
export const MIN_TEMP = -70;
export const MAX_TEMP = 70;

// Allowed distance radius from observation point in kms.
export const MAX_KM_DIST = 3;

/* Test mode indicator. Used to:
    -Enable option to skip location validation.
*/
export const TEST_MODE = true;

// Require location validation. Can be disabled for testing.
export const VALIDATE_LOCATION = { value: true };