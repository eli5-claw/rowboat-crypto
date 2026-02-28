import { sampleNodes, sampleEdges, sampleTrades } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Network, BookOpen, TrendingUp, Wallet, Search, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-zinc-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Rowboat Crypto</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-orange-600">Knowledge Graph</a>
            <a href="#" className="text-sm font-medium hover:text-orange-600">Trading Journal</a>
            <a href="#" className="text-sm font-medium hover:text-orange-600">MCP Server</a>
          </nav>
          <Button size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Rowboat Extension for Crypto/DeFi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Your Crypto Knowledge{" "}
            <span className="text-orange-600">As a Graph</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Turn on-chain data, trades, and portfolio history into persistent, 
            queryable knowledge. Local-first. Privacy-preserving. AI-powered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Network className="w-5 h-5 mr-2" />
              Explore Graph
            </Button>
            <Button variant="outline">
              <BookOpen className="w-5 h-5 mr-2" />
              View Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Nodes", value: "1,247", icon: Network },
            { label: "Transactions", value: "89", icon: TrendingUp },
            { label: "Trades", value: "12", icon: BookOpen },
            { label: "Protocols", value: "8", icon: Wallet },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <div className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5 text-orange-600" />
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="graph" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
            <TabsTrigger value="trades">Trading Journal</TabsTrigger>
            <TabsTrigger value="mcp">MCP Server</TabsTrigger>
          </TabsList>

          <TabsContent value="graph" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Graph Explorer</CardTitle>
                <CardDescription>
                  Visualize connections between wallets, tokens, protocols, and trades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-3">Nodes ({sampleNodes.length})</h3>
                    <div className="space-y-2">
                      {sampleNodes.map((node) => (
                        <div key={node.id} className="flex items-center gap-2 p-2 rounded-lg border">
                          <Badge variant="outline">{node.type}</Badge>
                          <span className="font-medium">{node.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Relationships ({sampleEdges.length})</h3>
                    <div className="space-y-2">
                      {sampleEdges.map((edge) => (
                        <div key={edge.id} className="flex items-center gap-2 p-2 rounded-lg border text-sm">
                          <span className="text-muted-foreground">{edge.source}</span>
                          <span className="text-orange-600">→ {edge.type} →</span>
                          <span className="text-muted-foreground">{edge.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Trading Journal</CardTitle>
                  <CardDescription>Log and analyze your trades with AI-powered insights</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Trade
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleTrades.map((trade) => (
                    <div key={trade.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge>{trade.tokenIn} → {trade.tokenOut}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(trade.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`font-bold ${(trade.pnl || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {(trade.pnl || 0) >= 0 ? '+' : ''}{trade.pnl || 0} ({(((trade.pnl || 0) / trade.amountIn) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{trade.reasoning}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Tx: {trade.txHash.slice(0, 10)}...{trade.txHash.slice(-6)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mcp" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>MCP Server</CardTitle>
                <CardDescription>
                  Query your crypto knowledge graph from any AI agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 font-mono text-sm">
                    <div className="text-muted-foreground mb-2"># Example Queries:</div>
                    <div className="space-y-2">
                      <div>"What was my best trade last month?"</div>
                      <div>"Which protocols have I used?"</div>
                      <div>"Show me my USDC yield history"</div>
                      <div>"What tokens do I hold on Base?"</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input placeholder="Ask your knowledge graph..." />
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      Query
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-zinc-900 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Rowboat Crypto</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Eli5DeFi • Local-first • Privacy-preserving
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
