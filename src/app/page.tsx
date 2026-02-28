"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  gasPrice: string;
  gasUsed: string;
}

export default function RowboatCrypto() {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function fetchTransactions() {
    if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);

      // Using BaseScan API (free, no key required for basic calls)
      const response = await fetch(
        `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();

      if (data.status === '0' && data.message === 'No transactions found') {
        setTransactions([]);
      } else if (data.status === '1') {
        setTransactions(data.result);
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }

  const formatValue = (value: string) => {
    const eth = parseInt(value) / 1e18;
    return eth > 0 ? `${eth.toFixed(6)} ETH` : '0 ETH';
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isOutgoing = (tx: Transaction) => {
    return tx.from.toLowerCase() === address.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Rowboat Crypto</span>
            <Badge variant="secondary">Knowledge Graph for Wallets</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Wallet</CardTitle>
            <CardDescription>
              Enter an Ethereum address to fetch and analyze transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 font-mono"
              />
              <Button 
                onClick={fetchTransactions}
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {searched && !loading && (
          <>
            {transactions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No transactions found for this address</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                        {transactions.length} transactions found
                      </CardDescription>
                    </div>
                    <Badge>{formatAddress(address)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {transactions.map((tx) => (
                      <div key={tx.hash} className="p-4 hover:bg-zinc-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isOutgoing(tx) ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {isOutgoing(tx) ? (
                                <ArrowUpRight className="w-5 h-5" />
                              ) : (
                                <ArrowDownLeft className="w-5 h-5" />
                              )}
                            </div>
                            
                            <div>
                              <div className="font-medium">
                                {isOutgoing(tx) ? 'Sent' : 'Received'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {isOutgoing(tx) ? (
                                  <>To: {formatAddress(tx.to)}</>
                                ) : (
                                  <>From: {formatAddress(tx.from)}</>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(parseInt(tx.timestamp) * 1000).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`font-bold ${isOutgoing(tx) ? 'text-red-600' : 'text-emerald-600'}`}>
                              {isOutgoing(tx) ? '-' : '+'}{formatValue(tx.value)}
                            </div>
                            <a
                              href={`https://basescan.org/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center justify-end gap-1"
                            >
                              View
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!searched && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Enter a wallet address above to see transaction history and build your knowledge graph
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
