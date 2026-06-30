export function formatIDR(n: number): string {
  return n === 0 ? 'Free' : 'Rp ' + n.toLocaleString('id-ID');
}
