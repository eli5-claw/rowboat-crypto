export interface KnowledgeNode {
  id: string;
  type: 'wallet' | 'token' | 'protocol' | 'transaction' | 'trade' | 'yield';
  label: string;
  data: Record<string, any>;
  createdAt: string;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type: 'holds' | 'traded' | 'deposited' | 'withdrew' | 'yielded' | 'linked';
  data: Record<string, any>;
}

export interface Trade {
  id: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  reasoning: string;
  txHash: string;
  timestamp: string;
}

export const sampleNodes: KnowledgeNode[] = [
  {
    id: 'wallet-1',
    type: 'wallet',
    label: 'My Wallet',
    data: { address: '0x4c9a...a8e9', chain: 'Base' },
    createdAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'token-usdc',
    type: 'token',
    label: 'USDC',
    data: { symbol: 'USDC', decimals: 6, stablecoin: true },
    createdAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'token-eth',
    type: 'token',
    label: 'ETH',
    data: { symbol: 'ETH', decimals: 18 },
    createdAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'protocol-aave',
    type: 'protocol',
    label: 'Aave',
    data: { chain: 'Base', tvl: 4200000000 },
    createdAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'tx-1',
    type: 'transaction',
    label: 'Deposit to Aave',
    data: { amount: 1000, token: 'USDC', apy: 4.52 },
    createdAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'trade-1',
    type: 'trade',
    label: 'ETH Long',
    data: { pnl: 250, roi: 12.5 },
    createdAt: '2026-02-27T14:30:00Z',
  },
];

export const sampleEdges: KnowledgeEdge[] = [
  { id: 'e1', source: 'wallet-1', target: 'token-usdc', type: 'holds', data: { balance: 50000 } },
  { id: 'e2', source: 'wallet-1', target: 'token-eth', type: 'holds', data: { balance: 10.5 } },
  { id: 'e3', source: 'wallet-1', target: 'protocol-aave', type: 'deposited', data: { amount: 1000 } },
  { id: 'e4', source: 'wallet-1', target: 'tx-1', type: 'linked', data: {} },
  { id: 'e5', source: 'wallet-1', target: 'trade-1', type: 'traded', data: {} },
];

export const sampleTrades: Trade[] = [
  {
    id: 'trade-1',
    tokenIn: 'USDC',
    tokenOut: 'ETH',
    amountIn: 2000,
    amountOut: 0.65,
    entryPrice: 3076,
    exitPrice: 3460,
    pnl: 250,
    reasoning: 'Bullish on Base ecosystem growth, technical breakout at $3K resistance',
    txHash: '0xabc123...',
    timestamp: '2026-02-27T14:30:00Z',
  },
  {
    id: 'trade-2',
    tokenIn: 'ETH',
    tokenOut: 'USDC',
    amountIn: 0.5,
    amountOut: 1750,
    entryPrice: 3200,
    exitPrice: 3500,
    pnl: 150,
    reasoning: 'Taking profits at resistance, will rebuy on pullback',
    txHash: '0xdef456...',
    timestamp: '2026-02-26T09:15:00Z',
  },
];
