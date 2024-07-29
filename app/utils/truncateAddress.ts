const regexForTruncation = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export function truncateAddress(address: string): string {
  const match = address.match(regexForTruncation)
  if (!match) {
    return address
  }
  return `${match[1]}...${match[2]}`
}
