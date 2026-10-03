const EMAIL_PATTERN =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return false;

  const [localPart, domain] = email.split("@");
  const domainLabels = domain.split(".");
  const topLevelDomain = domainLabels.at(-1) ?? "";
  return (
    localPart.length <= 64 &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..") &&
    domainLabels.every((label) => label.length <= 63) &&
    topLevelDomain.length >= 2 &&
    /[A-Z]/i.test(topLevelDomain)
  );
}
