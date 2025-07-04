// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Author: @noeldnathan
// Self Protocol ExampleV2 Contract
import {SelfVerificationRoot} from "@selfxyz/contracts/contracts/abstract/SelfVerificationRoot.sol";
import {ISelfVerificationRoot} from "@selfxyz/contracts/contracts/interfaces/ISelfVerificationRoot.sol";
import {IIdentityVerificationHubV2} from "@selfxyz/contracts/contracts/interfaces/IIdentityVerificationHubV2.sol";
import {SelfStructs} from "@selfxyz/contracts/contracts/libraries/SelfStructs.sol";
import {AttestationId} from "@selfxyz/contracts/contracts/constants/AttestationId.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

//0xDFBfA6d4E1b7F4De09F41B68F1b1C72dD0740cE4
contract ExampleV2 is SelfVerificationRoot, Ownable {
    // Your app-specific configuration ID
    bytes32 public configId;

    constructor(
        address i_identityVerificationHubV2, // V2 Hub address
        uint256 i_scope // Application-specific scope identifier
    )
        SelfVerificationRoot(i_identityVerificationHubV2, i_scope)
        Ownable(msg.sender)
    {
        // Initialize with empty configId - set it up in Step 2
    }

    function setScope(uint256 in_scope) external onlyOwner {
        _setScope(in_scope);
    }

    function getConfigId(
        bytes32,
        bytes32,
        bytes memory
    ) public pure override returns (bytes32) {
        // Replace with your actual config ID from the tool
        return
            0xaa3a22b95171a99564d606797e30a87cee76d573673a637ca4f97cac80360b2d;
    }

    // Override to handle successful verification
    function customVerificationHook(
        ISelfVerificationRoot.GenericDiscloseOutputV2 memory output,
        bytes memory
    ) internal virtual override {
        // Your custom business logic here
        // Example: Store verified user data, mint NFT, transfer tokens, etc.

        // Access verified data:
        // output.userIdentifier - user's unique identifier
        // output.name - verified name
        // output.nationality - verified nationality
        // output.dateOfBirth - verified birth date
        // etc.

        // Example: Simple verification check
        require(bytes(output.nationality).length > 0, "Nationality required");
    }
}
