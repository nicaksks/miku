import Miku from "@miku";
import PermissionsBuilder from "@miku/builder/Permissions";
import { ChannelType, PermissionsBitField, PermissionType } from "@miku/enum";

const miku = new Miku({
    token: '<TOKEN>',
    guild_id: '<GUILD_ID>',
    url: '<YOUR_WEBSITE_URL>'
})

const users = ['123', '321']

//Instanciar a classe PermissionsBuilder te permite adicionar, remover permissões e adicionar o tipo de permissão;
//deny_everyone() - Vai pegar as permissões que foram passadas em Allow e vai remover para todos os outros usuários que não foram passado no constructor.
const perm = new PermissionsBuilder(users)
    .allow([PermissionsBitField.CONNECT, PermissionsBitField.SPEAK, PermissionsBitField.STREAM, PermissionsBitField.VIEW_CHANNEL])
    .deny([PermissionsBitField.CONNECT, PermissionsBitField.SPEAK])
    .type(PermissionType.Member)
    .deny_everyone()

//Lista de Permissões, são permissões que o usuário vai obter. Não é possível remover permissões;
//Lista do tipo PermissionsBitField são feitos para quando você sabe que vai negar as mesmas permissões para todos os outros usuários
//Caso queira ter mais controle das permissões e tipo de quem vai e não vai usar. use PermissionsBuilder
const perms = [PermissionsBitField.CONNECT, PermissionsBitField.SPEAK, PermissionsBitField.STREAM, PermissionsBitField.VIEW_CHANNEL]
//Exemplo usando PermissionsBuilder
/*
new PermissionsBuilder(users)
    .allow([PermissionsBitField.CONNECT, PermissionsBitField.SPEAK, PermissionsBitField.STREAM, PermissionsBitField.VIEW_CHANNEL])
    .type(PermissionType.Member)
    .deny_everyone()
*/

//Você pode passar da mesma maneira de perm,  o lado negativo é que fica feio e ChannelPermissions não aceita deny_everyone,
//Você vai ter que passar as mesmas permissões de allow em deny
//E preciso criar um array de ChannelPermissions baseado nos usuários, se tiver apenas um Array de ChannelPermissions, apenas o primeiro usuário
//vai receber as permissões
const permss = [{ allow: PermissionsBitField.CONNECT, deny: [PermissionsBitField.CONNECT, PermissionsBitField.SEND_MESSAGE] }]

await miku.channel.create({
    type: ChannelType.VOICE,
    name: '<CHANNEL_NAME>',
    parent_id: '<CATEGORY_ID>',
    usersId: users,
    permission_overwrites: perm //perm, perms ou permss
})