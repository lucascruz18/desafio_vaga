import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,

  // Função para conectar ao banco de dados MongoDB
  async connect (uri: string): Promise<void> {
    try {
      // Tentando se conectar ao MongoDB
      this.client = await MongoClient.connect(uri)
      console.log('Conectado ao MongoDB com sucesso')
    } catch (error) {
      // Caso o erro aconteça, ele será logado
      console.error('Erro ao conectar no MongoDB:', error)
      throw error // Relançando o erro para ser tratado na chamada
    }
  },

  // Função para desconectar do MongoDB
  async disconnect (): Promise<void> {
    if (this.client) {
      // Fechando a conexão
      await this.client.close()
      this.client = null
      console.log('Desconectado do MongoDB')
    }
  },

  // Função para obter a coleção do banco de dados
  async getCollection (name: string): Promise<Collection> {
    if (!this.client || !this.client.topology.isConnected()) {
      // Conectando caso não esteja conectado
      await this.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/zeztra-challenge')
    }
    if (!this.client) {
      throw new Error('MongoClient is not connected')
    }
    return this.client.db().collection(name) // Garantindo que o client está conectado
  },

  // Função para mapear o objeto retirando o _id e colocando um id
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
