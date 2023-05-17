// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

//Add array here
const DEMO_FROM_SECRET_KEY = new Uint8Array(
    [
      ]            
);

const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

    // Sender wallet
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Reciever wallet
    const to = Keypair.generate();

    var senderWalletBalance = await connection.getBalance(
        new PublicKey(from.publicKey)
    );
    var senderWalletBalanceSol = parseInt(senderWalletBalance)/LAMPORTS_PER_SOL;
    console.log(`Sender Wallet Balance is: ${senderWalletBalanceSol} SOL`)
    const halfBalance = senderWalletBalanceSol * 0.5;

    // Latest blockhash (unique identifer of the block) of the cluster
    let latestBlockHash = await connection.getLatestBlockhash();

    console.log("Airdrop completed for the Sender account");

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: halfBalance * LAMPORTS_PER_SOL
        })
    );
    
    var senderWalletBalance = await connection.getBalance(
        new PublicKey(from.publicKey)
    );
    var senderWalletBalanceSol = parseInt(senderWalletBalance)/LAMPORTS_PER_SOL;
 //   var senderWalletBalanceSol = parseInt(senderWalletBalance)/LAMPORTS_PER_SOL;
    console.log(`Sender Wallet Balance is: ${senderWalletBalanceSol} SOL`)

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    )
    console.log('Signature is ', signature);
}

transferSol();