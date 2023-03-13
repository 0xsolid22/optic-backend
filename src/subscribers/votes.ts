import { BigNumber, ethers } from 'ethers';
import { VOTING_CONTRACT, VOTING_ABI } from '../consts/votes';
import prisma from '../prisma';

export default function main() {
  const ethProvider = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_API_KEY);
  const votingContract = new ethers.Contract(VOTING_CONTRACT, VOTING_ABI, ethProvider);

  votingContract.on('Registered', async (voter: string) => {
    await prisma.voter.create({
      data: {
        address: voter,
      },
    });
  });

  votingContract.on('Voted', async (candidate: BigNumber, voter: string) => {
    const registeredVoter = await prisma.voter.findFirst({
      where: {
        address: { equals: String(voter), mode: 'insensitive' },
      },
    });
    if (registeredVoter) {
      await prisma.voteResult.create({
        data: {
          candidate: candidate.toNumber(),
          voterId: registeredVoter.id,
        },
      });
    } else {
      console.log('--> voter not registerd yet');
    }
  });
}
