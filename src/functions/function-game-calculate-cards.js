export function calcUserCards (cards, userCards, played) {
  const userCardsCalculated = Object.entries(cards).filter(([key, card]) => {
    const userCardIndex = userCards.indexOf(key)
    if (played) {
      return userCardIndex >= 0
    }
    return userCardIndex < 0
  })
  return Object.fromEntries(userCardsCalculated)
}
