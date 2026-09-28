// Product screens drawn in MockFrame's `phone` chrome. The home wall pairs two
// of these from one app into a single tile, side by side. Keep this in step
// with the mocks' own chrome="phone": scripts/verify.mjs fails the build if a
// wall pair holds anything but two phone frames.
export const phoneScreens: ReadonlySet<string> = new Set([
  'cs-explore',
  'cs-apply',
  'cs-submit',
  'cs-check',
  'cs-track',
  'kyc-home',
  'kyc-add',
  'kyc-consent',
  'acct-upload',
  'acct-question-phone',
]);
